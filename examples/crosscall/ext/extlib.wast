(module
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $i32_i32_=>_none (func (param i32 i32)))
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (type $i32_i32_i32_=>_none (func (param i32 i32 i32)))
 (type $none_=>_i32 (func (result i32)))
 (type $none_=>_none (func))
 (type $i32_=>_none (func (param i32)))
 (type $i32_i32_i32_=>_i32 (func (param i32 i32 i32) (result i32)))
 (import "env" "memory" (memory $0 2 16))
 (data (i32.const 1036) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\000\00")
 (data (i32.const 1068) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\001\00")
 (data (i32.const 1100) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\002\00")
 (data (i32.const 1132) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\003\00")
 (data (i32.const 1164) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\004\00")
 (data (i32.const 1196) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\005\00")
 (data (i32.const 1228) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\006\00")
 (data (i32.const 1260) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\007\00")
 (data (i32.const 1292) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\008\00")
 (data (i32.const 1324) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\009\00")
 (data (i32.const 1356) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\00a\00")
 (data (i32.const 1388) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\00b\00")
 (data (i32.const 1420) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\00c\00")
 (data (i32.const 1452) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\00d\00")
 (data (i32.const 1484) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\00e\00")
 (data (i32.const 1516) "\02\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\02\00\00\00f\00")
 (data (i32.const 1548) "@\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00@\00\00\00 \04\00\00@\04\00\00`\04\00\00\80\04\00\00\a0\04\00\00\c0\04\00\00\e0\04\00\00\00\05\00\00 \05\00\00@\05\00\00`\05\00\00\80\05\00\00\a0\05\00\00\c0\05\00\00\e0\05\00\00\00\06\00\00")
 (data (i32.const 1644) "\10\00\00\00\01\00\00\00\00\00\00\00\03\00\00\00\10\00\00\00 \06\00\00 \06\00\00@\00\00\00\10\00\00\00")
 (data (i32.const 1692) "\04\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00\d1\83Q+")
 (data (i32.const 1724) "\04\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00j7\12\e2")
 (data (i32.const 1756) "\1e\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\1e\00\00\00u\00n\00e\00x\00p\00e\00c\00t\00e\00d\00 \00n\00u\00l\00l\00")
 (data (i32.const 1820) "\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data (i32.const 1852) "\00\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\00\00\00\00")
 (data (i32.const 1884) "\1c\00\00\00\01\00\00\00\00\00\00\00\01\00\00\00\1c\00\00\00e\00x\00t\00l\00i\00b\00 \00c\00a\00l\00l\00e\00d\00.\00")
 (data (i32.const 1932) "\04\00\00\00\01\00\00\00\00\00\00\00\00\00\00\00\04\00\00\00\1f\f7\cb\b8")
 (import "seal0" "seal_input" (func $../../../assembly/seal/seal0/seal_input (param i32 i32)))
 (import "seal0" "seal_println" (func $../../../assembly/seal/seal0/seal_println (param i32 i32)))
 (import "seal0" "seal_return" (func $../../../assembly/seal/seal0/seal_return (param i32 i32 i32)))
 (global $~lib/rt/stub/offset (mut i32) (i32.const 0))
 (global $extlib/msg (mut i32) (i32.const 0))
 (export "deploy" (func $extlib/deploy))
 (export "call" (func $extlib/call))
 (start $~start)
 (func $~lib/rt/stub/computeSize (param $0 i32) (result i32)
  (i32.sub
   (i32.and
    (i32.add
     (local.get $0)
     (i32.const 19)
    )
    (i32.const -16)
   )
   (i32.const 4)
  )
 )
 (func $~lib/rt/stub/maybeGrowMemory (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (if
   (i32.gt_u
    (local.get $0)
    (local.tee $1
     (i32.and
      (i32.add
       (i32.shl
        (local.tee $2
         (memory.size)
        )
        (i32.const 16)
       )
       (i32.const 15)
      )
      (i32.const -16)
     )
    )
   )
   (if
    (i32.lt_s
     (memory.grow
      (select
       (local.get $2)
       (local.tee $1
        (i32.shr_u
         (i32.and
          (i32.add
           (i32.sub
            (local.get $0)
            (local.get $1)
           )
           (i32.const 65535)
          )
          (i32.const -65536)
         )
         (i32.const 16)
        )
       )
       (i32.lt_s
        (local.get $1)
        (local.get $2)
       )
      )
     )
     (i32.const 0)
    )
    (if
     (i32.lt_s
      (memory.grow
       (local.get $1)
      )
      (i32.const 0)
     )
     (unreachable)
    )
   )
  )
  (global.set $~lib/rt/stub/offset
   (local.get $0)
  )
 )
 (func $~lib/rt/stub/__alloc (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (if
   (i32.gt_u
    (local.get $0)
    (i32.const 1073741820)
   )
   (unreachable)
  )
  (local.set $1
   (global.get $~lib/rt/stub/offset)
  )
  (call $~lib/rt/stub/maybeGrowMemory
   (i32.add
    (local.tee $2
     (i32.add
      (global.get $~lib/rt/stub/offset)
      (i32.const 4)
     )
    )
    (local.tee $0
     (call $~lib/rt/stub/computeSize
      (local.get $0)
     )
    )
   )
  )
  (i32.store
   (local.get $1)
   (local.get $0)
  )
  (local.get $2)
 )
 (func $~lib/rt/stub/__new (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (if
   (i32.gt_u
    (local.get $0)
    (i32.const 1073741804)
   )
   (unreachable)
  )
  (i32.store offset=4
   (local.tee $2
    (i32.sub
     (local.tee $3
      (call $~lib/rt/stub/__alloc
       (i32.add
        (local.get $0)
        (i32.const 16)
       )
      )
     )
     (i32.const 4)
    )
   )
   (i32.const 0)
  )
  (i32.store offset=8
   (local.get $2)
   (i32.const 0)
  )
  (i32.store offset=12
   (local.get $2)
   (local.get $1)
  )
  (i32.store offset=16
   (local.get $2)
   (local.get $0)
  )
  (i32.add
   (local.get $3)
   (i32.const 16)
  )
 )
 (func $~lib/memory/memory.copy (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (block $~lib/util/memory/memmove|inlined.0
   (local.set $4
    (local.get $2)
   )
   (br_if $~lib/util/memory/memmove|inlined.0
    (i32.eq
     (local.get $0)
     (local.get $1)
    )
   )
   (if
    (i32.lt_u
     (local.get $0)
     (local.get $1)
    )
    (loop $while-continue|0
     (if
      (local.get $4)
      (block
       (local.set $0
        (i32.add
         (local.tee $2
          (local.get $0)
         )
         (i32.const 1)
        )
       )
       (local.set $1
        (i32.add
         (local.tee $3
          (local.get $1)
         )
         (i32.const 1)
        )
       )
       (i32.store8
        (local.get $2)
        (i32.load8_u
         (local.get $3)
        )
       )
       (local.set $4
        (i32.sub
         (local.get $4)
         (i32.const 1)
        )
       )
       (br $while-continue|0)
      )
     )
    )
    (loop $while-continue|1
     (if
      (local.get $4)
      (block
       (i32.store8
        (i32.add
         (local.tee $4
          (i32.sub
           (local.get $4)
           (i32.const 1)
          )
         )
         (local.get $0)
        )
        (i32.load8_u
         (i32.add
          (local.get $1)
          (local.get $4)
         )
        )
       )
       (br $while-continue|1)
      )
     )
    )
   )
  )
 )
 (func $~lib/rt/__newArray (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local.set $4
   (local.tee $2
    (call $~lib/rt/stub/__new
     (i32.const 16)
     (i32.const 6)
    )
   )
  )
  (local.set $3
   (call $~lib/rt/stub/__new
    (local.get $0)
    (i32.const 0)
   )
  )
  (if
   (local.get $1)
   (call $~lib/memory/memory.copy
    (local.get $3)
    (local.get $1)
    (local.get $0)
   )
  )
  (i32.store
   (local.get $4)
   (local.get $3)
  )
  (i32.store offset=4
   (local.get $2)
   (local.get $3)
  )
  (i32.store offset=8
   (local.get $2)
   (local.get $0)
  )
  (i32.store offset=12
   (local.get $2)
   (local.get $0)
  )
  (local.get $2)
 )
 (func $extlib/ExtLib#constructor
  (drop
   (call $~lib/rt/stub/__new
    (i32.const 0)
    (i32.const 12)
   )
  )
 )
 (func $~lib/memory/memory.fill (param $0 i32) (param $1 i32)
  (local $2 i32)
  (loop $while-continue|0
   (if
    (local.get $1)
    (block
     (local.set $0
      (i32.add
       (local.tee $2
        (local.get $0)
       )
       (i32.const 1)
      )
     )
     (i32.store8
      (local.get $2)
      (i32.const 0)
     )
     (local.set $1
      (i32.sub
       (local.get $1)
       (i32.const 1)
      )
     )
     (br $while-continue|0)
    )
   )
  )
 )
 (func $~lib/typedarray/Uint8Array#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (i32.store
   (block (result i32)
    (if
     (i32.eqz
      (local.tee $1
       (call $~lib/rt/stub/__new
        (i32.const 12)
        (i32.const 15)
       )
      )
     )
     (local.set $1
      (call $~lib/rt/stub/__new
       (i32.const 12)
       (i32.const 2)
      )
     )
    )
    (local.get $1)
   )
   (i32.const 0)
  )
  (i32.store offset=4
   (local.get $1)
   (i32.const 0)
  )
  (i32.store offset=8
   (local.get $1)
   (i32.const 0)
  )
  (if
   (i32.gt_u
    (local.get $0)
    (i32.const 1073741820)
   )
   (unreachable)
  )
  (call $~lib/memory/memory.fill
   (local.tee $2
    (call $~lib/rt/stub/__new
     (local.get $0)
     (i32.const 0)
    )
   )
   (local.get $0)
  )
  (drop
   (i32.load
    (local.get $1)
   )
  )
  (i32.store
   (local.get $1)
   (local.get $2)
  )
  (i32.store offset=4
   (local.get $1)
   (local.get $2)
  )
  (i32.store offset=8
   (local.get $1)
   (local.get $0)
  )
  (local.get $1)
 )
 (func $../../../assembly/primitives/readbuffer/ReadBuffer#get:valueBuffer (param $0 i32) (result i32)
  (i32.load
   (i32.load
    (local.get $0)
   )
  )
 )
 (func $~lib/array/Array<u8>#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (i32.store
   (local.tee $2
    (call $~lib/rt/stub/__new
     (i32.const 16)
     (i32.const 6)
    )
   )
   (i32.const 0)
  )
  (i32.store offset=4
   (local.get $2)
   (i32.const 0)
  )
  (i32.store offset=8
   (local.get $2)
   (i32.const 0)
  )
  (i32.store offset=12
   (local.get $2)
   (i32.const 0)
  )
  (if
   (i32.gt_u
    (local.get $0)
    (i32.const 1073741820)
   )
   (unreachable)
  )
  (call $~lib/memory/memory.fill
   (local.tee $0
    (call $~lib/rt/stub/__new
     (local.tee $1
      (local.get $0)
     )
     (i32.const 0)
    )
   )
   (local.get $1)
  )
  (drop
   (i32.load
    (local.get $2)
   )
  )
  (i32.store
   (local.get $2)
   (local.get $0)
  )
  (i32.store offset=4
   (local.get $2)
   (local.get $0)
  )
  (i32.store offset=8
   (local.get $2)
   (local.get $1)
  )
  (i32.store offset=12
   (local.get $2)
   (local.get $1)
  )
  (local.get $2)
 )
 (func $../../../assembly/primitives/readbuffer/ReadBuffer#get:valueBytes (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local.set $2
   (i32.load
    (local.get $0)
   )
  )
  (local.set $3
   (i32.load offset=4
    (local.get $0)
   )
  )
  (local.set $0
   (i32.const 0)
  )
  (local.set $1
   (i32.const 3)
  )
  (loop $for-loop|0
   (if
    (i32.ge_s
     (local.get $1)
     (i32.const 0)
    )
    (block
     (if
      (i32.ge_u
       (local.get $1)
       (i32.load offset=8
        (local.tee $4
         (i32.load
          (local.get $3)
         )
        )
       )
      )
      (unreachable)
     )
     (local.set $0
      (i32.or
       (local.get $0)
       (i32.shl
        (i32.load8_u
         (i32.add
          (local.get $1)
          (i32.load offset=4
           (local.get $4)
          )
         )
        )
        (i32.shl
         (local.get $1)
         (i32.const 3)
        )
       )
      )
     )
     (local.set $1
      (i32.sub
       (local.get $1)
       (i32.const 1)
      )
     )
     (br $for-loop|0)
    )
   )
  )
  (call $~lib/memory/memory.copy
   (i32.load
    (local.tee $1
     (call $~lib/array/Array<u8>#constructor
      (block (result i32)
       (if
        (i32.eq
         (local.get $0)
         (i32.const -1)
        )
        (local.set $0
         (i32.load offset=8
          (local.get $2)
         )
        )
       )
       (local.get $0)
      )
     )
    )
   )
   (i32.load
    (local.get $2)
   )
   (local.get $0)
  )
  (local.get $1)
 )
 (func $~lib/array/Array<u8>#slice (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local.set $3
   (i32.load offset=12
    (local.get $0)
   )
  )
  (local.set $1
   (if (result i32)
    (i32.lt_s
     (local.get $1)
     (i32.const 0)
    )
    (select
     (local.tee $1
      (i32.add
       (local.get $1)
       (local.get $3)
      )
     )
     (i32.const 0)
     (i32.gt_s
      (local.get $1)
      (i32.const 0)
     )
    )
    (select
     (local.get $1)
     (local.get $3)
     (i32.lt_s
      (local.get $1)
      (local.get $3)
     )
    )
   )
  )
  (call $~lib/memory/memory.copy
   (i32.load offset=4
    (local.tee $3
     (call $~lib/rt/__newArray
      (local.tee $2
       (select
        (local.tee $2
         (i32.sub
          (if (result i32)
           (i32.lt_s
            (local.get $2)
            (i32.const 0)
           )
           (select
            (local.tee $2
             (i32.add
              (local.get $2)
              (local.get $3)
             )
            )
            (i32.const 0)
            (i32.gt_s
             (local.get $2)
             (i32.const 0)
            )
           )
           (select
            (local.get $2)
            (local.get $3)
            (i32.lt_s
             (local.get $2)
             (local.get $3)
            )
           )
          )
          (local.get $1)
         )
        )
        (i32.const 0)
        (i32.gt_s
         (local.get $2)
         (i32.const 0)
        )
       )
      )
      (i32.const 0)
     )
    )
   )
   (i32.add
    (local.get $1)
    (i32.load offset=4
     (local.get $0)
    )
   )
   (local.get $2)
  )
  (local.get $3)
 )
 (func $../../../assembly/primitives/inputdata/MessageInputReader#get:fnParameters (param $0 i32) (result i32)
  (if
   (i32.eq
    (i32.load offset=12
     (call $../../../assembly/primitives/readbuffer/ReadBuffer#get:valueBytes
      (i32.load
       (local.get $0)
      )
     )
    )
    (i32.const 4)
   )
   (return
    (call $~lib/rt/__newArray
     (i32.const 0)
     (i32.const 1840)
    )
   )
  )
  (call $~lib/array/Array<u8>#slice
   (call $../../../assembly/primitives/readbuffer/ReadBuffer#get:valueBytes
    (i32.load
     (local.get $0)
    )
   )
   (i32.const 4)
   (i32.const 2147483647)
  )
 )
 (func $../../../assembly/buildins/Msg/Msg#init_sig_and_data (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (if
   (if (result i32)
    (i32.load offset=8
     (local.get $0)
    )
    (i32.eqz
     (i32.load offset=12
      (local.get $0)
     )
    )
    (i32.const 1)
   )
   (block
    (i32.store
     (local.tee $3
      (call $~lib/rt/stub/__new
       (i32.const 4)
       (i32.const 13)
      )
     )
     (i32.const 0)
    )
    (i32.store
     (local.tee $1
      (call $~lib/rt/stub/__new
       (i32.const 8)
       (i32.const 14)
      )
     )
     (i32.const 0)
    )
    (i32.store offset=4
     (local.get $1)
     (i32.const 0)
    )
    (local.set $2
     (call $~lib/typedarray/Uint8Array#constructor
      (i32.const 1024)
     )
    )
    (drop
     (i32.load
      (local.get $1)
     )
    )
    (i32.store
     (local.get $1)
     (local.get $2)
    )
    (local.set $2
     (i32.const 0)
    )
    (i32.store
     (local.tee $4
      (call $~lib/rt/stub/__new
       (i32.const 4)
       (i32.const 16)
      )
     )
     (i32.const 0)
    )
    (local.set $5
     (call $~lib/typedarray/Uint8Array#constructor
      (i32.const 4)
     )
    )
    (drop
     (i32.load
      (local.get $4)
     )
    )
    (i32.store
     (local.get $4)
     (local.get $5)
    )
    (loop $for-loop|0
     (if
      (i32.lt_s
       (local.get $2)
       (i32.const 4)
      )
      (block
       (local.set $5
        (i32.and
         (i32.shr_u
          (i32.const 1024)
          (i32.shl
           (local.get $2)
           (i32.const 3)
          )
         )
         (i32.const 255)
        )
       )
       (if
        (i32.ge_u
         (local.get $2)
         (i32.load offset=8
          (local.tee $6
           (i32.load
            (local.get $4)
           )
          )
         )
        )
        (unreachable)
       )
       (i32.store8
        (i32.add
         (local.get $2)
         (i32.load offset=4
          (local.get $6)
         )
        )
        (local.get $5)
       )
       (local.set $2
        (i32.add
         (local.get $2)
         (i32.const 1)
        )
       )
       (br $for-loop|0)
      )
     )
    )
    (drop
     (i32.load offset=4
      (local.get $1)
     )
    )
    (i32.store offset=4
     (local.get $1)
     (local.get $4)
    )
    (drop
     (i32.load
      (local.get $3)
     )
    )
    (i32.store
     (local.get $3)
     (local.get $1)
    )
    (call $../../../assembly/seal/seal0/seal_input
     (call $../../../assembly/primitives/readbuffer/ReadBuffer#get:valueBuffer
      (i32.load
       (local.get $3)
      )
     )
     (call $../../../assembly/primitives/readbuffer/ReadBuffer#get:valueBuffer
      (i32.load offset=4
       (i32.load
        (local.get $3)
       )
      )
     )
    )
    (if
     (i32.eqz
      (i32.load offset=8
       (local.get $0)
      )
     )
     (block
      (local.set $1
       (call $~lib/array/Array<u8>#constructor
        (i32.const 4)
       )
      )
      (drop
       (i32.load offset=8
        (local.get $0)
       )
      )
      (i32.store offset=8
       (local.get $0)
       (local.get $1)
      )
      (if
       (i32.eqz
        (local.tee $1
         (i32.load offset=8
          (local.get $0)
         )
        )
       )
       (unreachable)
      )
      (call $~lib/memory/memory.copy
       (i32.load
        (local.get $1)
       )
       (i32.load
        (call $~lib/array/Array<u8>#slice
         (call $../../../assembly/primitives/readbuffer/ReadBuffer#get:valueBytes
          (i32.load
           (local.get $3)
          )
         )
         (i32.const 0)
         (i32.const 4)
        )
       )
       (i32.const 4)
      )
     )
    )
    (local.set $1
     (i32.load offset=12
      (call $../../../assembly/primitives/inputdata/MessageInputReader#get:fnParameters
       (local.get $3)
      )
     )
    )
    (if
     (i32.eqz
      (i32.load offset=12
       (local.get $0)
      )
     )
     (if
      (i32.gt_s
       (local.get $1)
       (i32.const 0)
      )
      (block
       (local.set $2
        (call $~lib/array/Array<u8>#constructor
         (local.get $1)
        )
       )
       (drop
        (i32.load offset=12
         (local.get $0)
        )
       )
       (i32.store offset=12
        (local.get $0)
        (local.get $2)
       )
       (if
        (i32.eqz
         (local.tee $0
          (i32.load offset=12
           (local.get $0)
          )
         )
        )
        (unreachable)
       )
       (call $~lib/memory/memory.copy
        (i32.load
         (local.get $0)
        )
        (i32.load
         (call $../../../assembly/primitives/inputdata/MessageInputReader#get:fnParameters
          (local.get $3)
         )
        )
        (local.get $1)
       )
      )
      (block
       (local.set $3
        (call $~lib/rt/__newArray
         (i32.const 0)
         (i32.const 1872)
        )
       )
       (drop
        (i32.load offset=12
         (local.get $0)
        )
       )
       (i32.store offset=12
        (local.get $0)
        (local.get $3)
       )
      )
     )
    )
   )
  )
 )
 (func $../../../assembly/buildins/Msg/Msg#get:sig (param $0 i32) (result i32)
  (if
   (i32.eqz
    (i32.load offset=8
     (local.get $0)
    )
   )
   (call $../../../assembly/buildins/Msg/Msg#init_sig_and_data
    (local.get $0)
   )
  )
  (if
   (i32.eqz
    (local.tee $0
     (i32.load offset=8
      (local.get $0)
     )
    )
   )
   (unreachable)
  )
  (local.get $0)
 )
 (func $../../../assembly/buildins/Msg/Msg#isSelector (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (if
   (i32.ne
    (i32.load offset=12
     (call $../../../assembly/buildins/Msg/Msg#get:sig
      (local.get $0)
     )
    )
    (i32.load offset=12
     (local.tee $2
      (local.get $1)
     )
    )
   )
   (return
    (i32.const 0)
   )
  )
  (local.set $1
   (i32.const 4)
  )
  (block $~lib/util/memory/memcmp|inlined.0
   (br_if $~lib/util/memory/memcmp|inlined.0
    (i32.eq
     (local.tee $3
      (i32.load
       (call $../../../assembly/buildins/Msg/Msg#get:sig
        (local.get $0)
       )
      )
     )
     (local.tee $2
      (i32.load
       (local.get $2)
      )
     )
    )
   )
   (loop $while-continue|0
    (local.set $1
     (i32.sub
      (local.tee $0
       (local.get $1)
      )
      (i32.const 1)
     )
    )
    (if
     (local.get $0)
     (block
      (local.set $4
       (i32.sub
        (local.tee $0
         (i32.load8_u
          (local.get $3)
         )
        )
        (local.tee $5
         (i32.load8_u
          (local.get $2)
         )
        )
       )
      )
      (br_if $~lib/util/memory/memcmp|inlined.0
       (i32.ne
        (local.get $0)
        (local.get $5)
       )
      )
      (local.set $3
       (i32.add
        (local.get $3)
        (i32.const 1)
       )
      )
      (local.set $2
       (i32.add
        (local.get $2)
        (i32.const 1)
       )
      )
      (br $while-continue|0)
     )
    )
   )
   (local.set $4
    (i32.const 0)
   )
  )
  (i32.eqz
   (local.get $4)
  )
 )
 (func $extlib/deploy (result i32)
  (local $0 i32)
  (local $1 i32)
  (local.set $0
   (call $~lib/rt/__newArray
    (i32.const 4)
    (i32.const 1712)
   )
  )
  (local.set $1
   (call $~lib/rt/__newArray
    (i32.const 4)
    (i32.const 1744)
   )
  )
  (call $extlib/ExtLib#constructor)
  (if
   (i32.eqz
    (call $../../../assembly/buildins/Msg/Msg#isSelector
     (global.get $extlib/msg)
     (local.get $0)
    )
   )
   (drop
    (call $../../../assembly/buildins/Msg/Msg#isSelector
     (global.get $extlib/msg)
     (local.get $1)
    )
   )
  )
  (i32.const 0)
 )
 (func $../../../assembly/primitives/writebuffer/WriteBuffer#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (i32.store
   (local.tee $1
    (call $~lib/rt/stub/__new
     (i32.const 4)
     (i32.const 17)
    )
   )
   (i32.const 0)
  )
  (local.set $3
   (i32.load offset=16
    (i32.sub
     (local.get $0)
     (i32.const 20)
    )
   )
  )
  (i32.store
   (local.tee $2
    (call $~lib/rt/stub/__new
     (i32.const 12)
     (i32.const 15)
    )
   )
   (local.get $0)
  )
  (i32.store offset=8
   (local.get $2)
   (local.get $3)
  )
  (i32.store offset=4
   (local.get $2)
   (local.get $0)
  )
  (drop
   (i32.load
    (local.get $1)
   )
  )
  (i32.store
   (local.get $1)
   (local.get $2)
  )
  (local.get $1)
 )
 (func $~lib/string/String.UTF8.encodeUnsafe (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local.set $2
   (i32.const 1904)
  )
  (local.set $3
   (i32.add
    (i32.shl
     (local.get $0)
     (i32.const 1)
    )
    (i32.const 1904)
   )
  )
  (local.set $0
   (local.get $1)
  )
  (loop $while-continue|0
   (if
    (i32.lt_u
     (local.get $2)
     (local.get $3)
    )
    (block
     (local.set $0
      (if (result i32)
       (i32.lt_u
        (local.tee $1
         (i32.load16_u
          (local.get $2)
         )
        )
        (i32.const 128)
       )
       (block (result i32)
        (i32.store8
         (local.get $0)
         (local.get $1)
        )
        (i32.add
         (local.get $0)
         (i32.const 1)
        )
       )
       (if (result i32)
        (i32.lt_u
         (local.get $1)
         (i32.const 2048)
        )
        (block (result i32)
         (i32.store16
          (local.get $0)
          (i32.or
           (i32.or
            (i32.shr_u
             (local.get $1)
             (i32.const 6)
            )
            (i32.const 192)
           )
           (i32.shl
            (i32.or
             (i32.and
              (local.get $1)
              (i32.const 63)
             )
             (i32.const 128)
            )
            (i32.const 8)
           )
          )
         )
         (i32.add
          (local.get $0)
          (i32.const 2)
         )
        )
        (block (result i32)
         (if
          (select
           (i32.gt_u
            (local.get $3)
            (i32.add
             (local.get $2)
             (i32.const 2)
            )
           )
           (i32.const 0)
           (i32.eq
            (i32.and
             (local.get $1)
             (i32.const 64512)
            )
            (i32.const 55296)
           )
          )
          (if
           (i32.eq
            (i32.and
             (local.tee $4
              (i32.load16_u offset=2
               (local.get $2)
              )
             )
             (i32.const 64512)
            )
            (i32.const 56320)
           )
           (block
            (i32.store
             (local.get $0)
             (i32.or
              (i32.or
               (i32.or
                (i32.shl
                 (i32.or
                  (i32.and
                   (local.tee $1
                    (i32.or
                     (i32.add
                      (i32.shl
                       (i32.and
                        (local.get $1)
                        (i32.const 1023)
                       )
                       (i32.const 10)
                      )
                      (i32.const 65536)
                     )
                     (i32.and
                      (local.get $4)
                      (i32.const 1023)
                     )
                    )
                   )
                   (i32.const 63)
                  )
                  (i32.const 128)
                 )
                 (i32.const 24)
                )
                (i32.shl
                 (i32.or
                  (i32.and
                   (i32.shr_u
                    (local.get $1)
                    (i32.const 6)
                   )
                   (i32.const 63)
                  )
                  (i32.const 128)
                 )
                 (i32.const 16)
                )
               )
               (i32.shl
                (i32.or
                 (i32.and
                  (i32.shr_u
                   (local.get $1)
                   (i32.const 12)
                  )
                  (i32.const 63)
                 )
                 (i32.const 128)
                )
                (i32.const 8)
               )
              )
              (i32.or
               (i32.shr_u
                (local.get $1)
                (i32.const 18)
               )
               (i32.const 240)
              )
             )
            )
            (local.set $0
             (i32.add
              (local.get $0)
              (i32.const 4)
             )
            )
            (local.set $2
             (i32.add
              (local.get $2)
              (i32.const 4)
             )
            )
            (br $while-continue|0)
           )
          )
         )
         (i32.store16
          (local.get $0)
          (i32.or
           (i32.or
            (i32.shr_u
             (local.get $1)
             (i32.const 12)
            )
            (i32.const 224)
           )
           (i32.shl
            (i32.or
             (i32.and
              (i32.shr_u
               (local.get $1)
               (i32.const 6)
              )
              (i32.const 63)
             )
             (i32.const 128)
            )
            (i32.const 8)
           )
          )
         )
         (i32.store8 offset=2
          (local.get $0)
          (i32.or
           (i32.and
            (local.get $1)
            (i32.const 63)
           )
           (i32.const 128)
          )
         )
         (i32.add
          (local.get $0)
          (i32.const 3)
         )
        )
       )
      )
     )
     (local.set $2
      (i32.add
       (local.get $2)
       (i32.const 2)
      )
     )
     (br $while-continue|0)
    )
   )
  )
 )
 (func $~lib/string/String.UTF8.encode (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local.set $1
   (i32.const 1904)
  )
  (local.set $2
   (i32.add
    (i32.load
     (i32.const 1900)
    )
    (i32.const 1904)
   )
  )
  (loop $while-continue|0
   (if
    (i32.lt_u
     (local.get $1)
     (local.get $2)
    )
    (block
     (local.set $0
      (if (result i32)
       (i32.lt_u
        (local.tee $3
         (i32.load16_u
          (local.get $1)
         )
        )
        (i32.const 128)
       )
       (i32.add
        (local.get $0)
        (i32.const 1)
       )
       (if (result i32)
        (i32.lt_u
         (local.get $3)
         (i32.const 2048)
        )
        (i32.add
         (local.get $0)
         (i32.const 2)
        )
        (block (result i32)
         (if
          (select
           (i32.gt_u
            (local.get $2)
            (i32.add
             (local.get $1)
             (i32.const 2)
            )
           )
           (i32.const 0)
           (i32.eq
            (i32.and
             (local.get $3)
             (i32.const 64512)
            )
            (i32.const 55296)
           )
          )
          (if
           (i32.eq
            (i32.and
             (i32.load16_u offset=2
              (local.get $1)
             )
             (i32.const 64512)
            )
            (i32.const 56320)
           )
           (block
            (local.set $0
             (i32.add
              (local.get $0)
              (i32.const 4)
             )
            )
            (local.set $1
             (i32.add
              (local.get $1)
              (i32.const 4)
             )
            )
            (br $while-continue|0)
           )
          )
         )
         (i32.add
          (local.get $0)
          (i32.const 3)
         )
        )
       )
      )
     )
     (local.set $1
      (i32.add
       (local.get $1)
       (i32.const 2)
      )
     )
     (br $while-continue|0)
    )
   )
  )
  (local.set $0
   (call $~lib/rt/stub/__new
    (local.get $0)
    (i32.const 0)
   )
  )
  (call $~lib/string/String.UTF8.encodeUnsafe
   (i32.shr_u
    (i32.load
     (i32.const 1900)
    )
    (i32.const 1)
   )
   (local.get $0)
  )
  (local.get $0)
 )
 (func $../../../assembly/primitives/writebuffer/WriteBuffer#get:size (param $0 i32) (result i32)
  (i32.load offset=8
   (i32.load
    (local.get $0)
   )
  )
 )
 (func $../../../assembly/deps/as-scale-codec/UInt/UInt32/UInt32#constructor (param $0 i32) (result i32)
  (local $1 i32)
  (i32.store
   (block (result i32)
    (if
     (i32.eqz
      (local.tee $1
       (call $~lib/rt/stub/__new
        (i32.const 8)
        (i32.const 19)
       )
      )
     )
     (local.set $1
      (call $~lib/rt/stub/__new
       (i32.const 8)
       (i32.const 20)
      )
     )
    )
    (local.get $1)
   )
   (i32.const 0)
  )
  (i32.store offset=4
   (local.get $1)
   (i32.const 0)
  )
  (i32.store offset=4
   (local.get $1)
   (local.get $0)
  )
  (i32.store
   (local.get $1)
   (i32.const 4)
  )
  (local.get $1)
 )
 (func $~lib/array/Array<u8>#__get (param $0 i32) (param $1 i32) (result i32)
  (if
   (i32.ge_u
    (local.get $1)
    (i32.load offset=12
     (local.get $0)
    )
   )
   (unreachable)
  )
  (i32.load8_u
   (i32.add
    (i32.load offset=4
     (local.get $0)
    )
    (local.get $1)
   )
  )
 )
 (func $~lib/array/ensureSize (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (if
   (i32.gt_u
    (local.get $1)
    (local.tee $6
     (i32.load offset=8
      (local.get $0)
     )
    )
   )
   (block
    (if
     (i32.gt_u
      (local.get $1)
      (i32.const 1073741820)
     )
     (unreachable)
    )
    (local.set $2
     (local.tee $9
      (i32.load
       (local.get $0)
      )
     )
    )
    (if
     (i32.gt_u
      (local.tee $3
       (local.get $1)
      )
      (i32.const 1073741804)
     )
     (unreachable)
    )
    (local.set $4
     (i32.add
      (local.get $3)
      (i32.const 16)
     )
    )
    (if
     (i32.eqz
      (select
       (i32.eqz
        (i32.and
         (local.tee $1
          (i32.sub
           (local.get $2)
           (i32.const 16)
          )
         )
         (i32.const 15)
        )
       )
       (i32.const 0)
       (local.get $1)
      )
     )
     (unreachable)
    )
    (local.set $8
     (i32.eq
      (global.get $~lib/rt/stub/offset)
      (i32.add
       (local.get $1)
       (local.tee $5
        (i32.load
         (local.tee $7
          (i32.sub
           (local.get $1)
           (i32.const 4)
          )
         )
        )
       )
      )
     )
    )
    (local.set $2
     (call $~lib/rt/stub/computeSize
      (local.get $4)
     )
    )
    (if
     (i32.gt_u
      (local.get $4)
      (local.get $5)
     )
     (if
      (local.get $8)
      (block
       (if
        (i32.gt_u
         (local.get $4)
         (i32.const 1073741820)
        )
        (unreachable)
       )
       (call $~lib/rt/stub/maybeGrowMemory
        (i32.add
         (local.get $1)
         (local.get $2)
        )
       )
       (i32.store
        (local.get $7)
        (local.get $2)
       )
      )
      (block
       (call $~lib/memory/memory.copy
        (local.tee $2
         (call $~lib/rt/stub/__alloc
          (select
           (local.get $2)
           (local.tee $4
            (i32.shl
             (local.get $5)
             (i32.const 1)
            )
           )
           (i32.gt_u
            (local.get $2)
            (local.get $4)
           )
          )
         )
        )
        (local.get $1)
        (local.get $5)
       )
       (local.set $1
        (local.get $2)
       )
      )
     )
     (if
      (local.get $8)
      (block
       (global.set $~lib/rt/stub/offset
        (i32.add
         (local.get $1)
         (local.get $2)
        )
       )
       (i32.store
        (local.get $7)
        (local.get $2)
       )
      )
     )
    )
    (i32.store offset=16
     (i32.sub
      (local.get $1)
      (i32.const 4)
     )
     (local.get $3)
    )
    (call $~lib/memory/memory.fill
     (i32.add
      (local.get $6)
      (local.tee $1
       (i32.add
        (local.get $1)
        (i32.const 16)
       )
      )
     )
     (i32.sub
      (local.get $3)
      (local.get $6)
     )
    )
    (if
     (i32.ne
      (local.get $1)
      (local.get $9)
     )
     (block
      (i32.store
       (local.get $0)
       (local.get $1)
      )
      (i32.store offset=4
       (local.get $0)
       (local.get $1)
      )
     )
    )
    (i32.store offset=8
     (local.get $0)
     (local.get $3)
    )
   )
  )
 )
 (func $~lib/array/Array<u8>#__set (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (if
   (i32.ge_u
    (local.get $1)
    (i32.load offset=12
     (local.get $0)
    )
   )
   (block
    (if
     (i32.lt_s
      (local.get $1)
      (i32.const 0)
     )
     (unreachable)
    )
    (call $~lib/array/ensureSize
     (local.get $0)
     (local.tee $3
      (i32.add
       (local.get $1)
       (i32.const 1)
      )
     )
    )
    (i32.store offset=12
     (local.get $0)
     (local.get $3)
    )
   )
  )
  (i32.store8
   (i32.add
    (i32.load offset=4
     (local.get $0)
    )
    (local.get $1)
   )
   (local.get $2)
  )
 )
 (func $../../../assembly/buildins/FnParameters/FnParameters#get<../../../assembly/deps/as-scale-codec/UInt/UInt32/UInt32> (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local.set $5
   (local.tee $4
    (call $../../../assembly/deps/as-scale-codec/UInt/UInt32/UInt32#constructor
     (i32.const 0)
    )
   )
  )
  (if
   (i32.ge_s
    (local.tee $1
     (i32.load
      (local.get $0)
     )
    )
    (i32.load offset=12
     (local.tee $2
      (i32.load offset=4
       (local.get $0)
      )
     )
    )
   )
   (unreachable)
  )
  (local.set $7
   (local.tee $6
    (call $~lib/array/Array<u8>#constructor
     (local.tee $8
      (i32.load
       (local.get $5)
      )
     )
    )
   )
  )
  (loop $for-loop|0
   (if
    (i32.lt_s
     (local.get $3)
     (i32.load offset=12
      (local.get $7)
     )
    )
    (if
     (i32.lt_s
      (local.get $3)
      (i32.sub
       (i32.load offset=12
        (local.get $2)
       )
       (local.get $1)
      )
     )
     (block
      (call $~lib/array/Array<u8>#__set
       (local.get $7)
       (local.get $3)
       (call $~lib/array/Array<u8>#__get
        (local.get $2)
        (i32.add
         (local.get $1)
         (local.get $3)
        )
       )
      )
      (local.set $3
       (i32.add
        (local.get $3)
        (i32.const 1)
       )
      )
      (br $for-loop|0)
     )
    )
   )
  )
  (local.set $2
   (call $~lib/array/Array<u8>#__get
    (local.get $6)
    (i32.const 0)
   )
  )
  (local.set $1
   (i32.const 1)
  )
  (loop $for-loop|00
   (if
    (i32.lt_s
     (local.get $1)
     (local.get $8)
    )
    (block
     (local.set $2
      (i32.or
       (local.get $2)
       (i32.shl
        (call $~lib/array/Array<u8>#__get
         (local.get $6)
         (local.get $1)
        )
        (i32.shl
         (i32.and
          (local.get $1)
          (i32.const 255)
         )
         (i32.const 3)
        )
       )
      )
     )
     (local.set $1
      (i32.add
       (local.get $1)
       (i32.const 1)
      )
     )
     (br $for-loop|00)
    )
   )
  )
  (i32.store offset=4
   (local.get $5)
   (local.get $2)
  )
  (i32.store
   (local.get $0)
   (i32.add
    (i32.load
     (local.get $0)
    )
    (i32.load
     (local.get $4)
    )
   )
  )
  (local.get $4)
 )
 (func $extlib/call (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (call $../../../assembly/seal/seal0/seal_println
   (call $../../../assembly/primitives/readbuffer/ReadBuffer#get:valueBuffer
    (local.tee $0
     (call $../../../assembly/primitives/writebuffer/WriteBuffer#constructor
      (call $~lib/string/String.UTF8.encode)
     )
    )
   )
   (call $../../../assembly/primitives/writebuffer/WriteBuffer#get:size
    (local.get $0)
   )
  )
  (call $extlib/ExtLib#constructor)
  (local.set $0
   (call $~lib/rt/__newArray
    (i32.const 4)
    (i32.const 1952)
   )
  )
  (if
   (call $../../../assembly/buildins/Msg/Msg#isSelector
    (global.get $extlib/msg)
    (local.get $0)
   )
   (block
    (if
     (i32.eqz
      (i32.load offset=12
       (local.tee $0
        (global.get $extlib/msg)
       )
      )
     )
     (call $../../../assembly/buildins/Msg/Msg#init_sig_and_data
      (local.get $0)
     )
    )
    (if
     (i32.eqz
      (local.tee $1
       (i32.load offset=12
        (local.get $0)
       )
      )
     )
     (unreachable)
    )
    (i32.store
     (local.tee $0
      (call $~lib/rt/stub/__new
       (i32.const 8)
       (i32.const 18)
      )
     )
     (i32.const 0)
    )
    (i32.store offset=4
     (local.get $0)
     (i32.const 0)
    )
    (drop
     (i32.load offset=4
      (local.get $0)
     )
    )
    (i32.store offset=4
     (local.get $0)
     (local.get $1)
    )
    (i32.store
     (local.get $0)
     (i32.const 0)
    )
    (local.set $1
     (call $~lib/array/Array<u8>#constructor
      (i32.load
       (local.tee $0
        (call $../../../assembly/deps/as-scale-codec/UInt/UInt32/UInt32#constructor
         (i32.add
          (i32.load offset=4
           (call $../../../assembly/buildins/FnParameters/FnParameters#get<../../../assembly/deps/as-scale-codec/UInt/UInt32/UInt32>
            (local.get $0)
           )
          )
          (i32.load offset=4
           (call $../../../assembly/buildins/FnParameters/FnParameters#get<../../../assembly/deps/as-scale-codec/UInt/UInt32/UInt32>
            (local.get $0)
           )
          )
         )
        )
       )
      )
     )
    )
    (local.set $2
     (i32.load
      (local.get $0)
     )
    )
    (local.set $3
     (local.tee $0
      (i32.load offset=4
       (local.get $0)
      )
     )
    )
    (call $~lib/array/Array<u8>#__set
     (local.get $1)
     (i32.const 0)
     (local.get $0)
    )
    (local.set $0
     (i32.const 1)
    )
    (loop $for-loop|0
     (if
      (i32.lt_s
       (local.get $0)
       (local.get $2)
      )
      (block
       (call $~lib/array/Array<u8>#__set
        (local.get $1)
        (local.get $0)
        (i32.shr_s
         (local.get $3)
         (i32.shl
          (local.get $0)
          (i32.const 3)
         )
        )
       )
       (local.set $0
        (i32.add
         (local.get $0)
         (i32.const 1)
        )
       )
       (br $for-loop|0)
      )
     )
    )
    (call $../../../assembly/seal/seal0/seal_return
     (i32.const 0)
     (call $../../../assembly/primitives/readbuffer/ReadBuffer#get:valueBuffer
      (local.tee $0
       (call $../../../assembly/primitives/writebuffer/WriteBuffer#constructor
        (i32.load
         (local.get $1)
        )
       )
      )
     )
     (call $../../../assembly/primitives/writebuffer/WriteBuffer#get:size
      (local.get $0)
     )
    )
   )
  )
  (i32.const 0)
 )
 (func $~start
  (local $0 i32)
  (global.set $~lib/rt/stub/offset
   (i32.const 1964)
  )
  (drop
   (call $~lib/rt/stub/__new
    (i32.const 0)
    (i32.const 4)
   )
  )
  (i32.store
   (local.tee $0
    (call $~lib/rt/stub/__new
     (i32.const 17)
     (i32.const 5)
    )
   )
   (i32.const 0)
  )
  (i32.store offset=4
   (local.get $0)
   (i32.const 0)
  )
  (i32.store offset=8
   (local.get $0)
   (i32.const 0)
  )
  (i32.store offset=12
   (local.get $0)
   (i32.const 0)
  )
  (i32.store8 offset=16
   (local.get $0)
   (i32.const 1)
  )
  (global.set $extlib/msg
   (local.get $0)
  )
 )
)
